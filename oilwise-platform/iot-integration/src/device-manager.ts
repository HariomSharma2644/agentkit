import mqtt from 'mqtt';
import { v4 as uuidv4 } from 'uuid';
import { logger } from './utils/logger';

export interface IoTDevice {
  id: string;
  name: string;
  type: 'smart_scale' | 'oil_meter' | 'temperature_sensor' | 'humidity_sensor';
  userId: string;
  location: string;
  status: 'active' | 'inactive' | 'error';
  lastReading: any;
  lastUpdated: Date;
}

export interface DeviceReading {
  deviceId: string;
  timestamp: Date;
  value: number;
  unit: string;
  metadata?: Record<string, any>;
}

export class IoTDeviceManager {
  private mqttClient: mqtt.MqttClient | null = null;
  private devices: Map<string, IoTDevice> = new Map();
  private readings: DeviceReading[] = [];
  private brokerUrl: string;

  constructor(brokerUrl: string = 'mqtt://localhost:1883') {
    this.brokerUrl = brokerUrl;
  }

  /**
   * Connect to MQTT broker
   */
  async connect(): Promise<void> {
    try {
      this.mqttClient = mqtt.connect(this.brokerUrl);

      this.mqttClient.on('connect', () => {
        logger.info('Connected to MQTT broker');
        this.subscribeToTopics();
      });

      this.mqttClient.on('message', (topic: string, message: Buffer) => {
        this.handleMessage(topic, message);
      });

      this.mqttClient.on('error', (error: Error) => {
        logger.error('MQTT error:', error);
      });
    } catch (error) {
      logger.error('Failed to connect to MQTT broker:', error);
      throw error;
    }
  }

  /**
   * Register a new IoT device
   */
  registerDevice(
    name: string,
    type: IoTDevice['type'],
    userId: string,
    location: string
  ): IoTDevice {
    const device: IoTDevice = {
      id: uuidv4(),
      name,
      type,
      userId,
      location,
      status: 'active',
      lastReading: null,
      lastUpdated: new Date(),
    };

    this.devices.set(device.id, device);
    logger.info(`Device registered: ${device.id} (${name})`);

    return device;
  }

  /**
   * Get device by ID
   */
  getDevice(deviceId: string): IoTDevice | undefined {
    return this.devices.get(deviceId);
  }

  /**
   * Get all devices for a user
   */
  getUserDevices(userId: string): IoTDevice[] {
    return Array.from(this.devices.values()).filter(d => d.userId === userId);
  }

  /**
   * Subscribe to device topics
   */
  private subscribeToTopics(): void {
    if (!this.mqttClient) return;

    // Subscribe to all device topics
    this.mqttClient.subscribe('devices/+/readings', (err) => {
      if (err) {
        logger.error('Failed to subscribe to device topics:', err);
      } else {
        logger.info('Subscribed to device topics');
      }
    });
  }

  /**
   * Handle incoming MQTT messages
   */
  private handleMessage(topic: string, message: Buffer): void {
    try {
      const data = JSON.parse(message.toString());
      const deviceId = topic.split('/')[1];

      const device = this.devices.get(deviceId);
      if (!device) {
        logger.warn(`Received message from unknown device: ${deviceId}`);
        return;
      }

      // Process reading
      const reading: DeviceReading = {
        deviceId,
        timestamp: new Date(),
        value: data.value,
        unit: data.unit || 'grams',
        metadata: data.metadata,
      };

      this.readings.push(reading);
      device.lastReading = reading;
      device.lastUpdated = new Date();

      logger.info(`Received reading from ${device.name}: ${data.value} ${data.unit}`);

      // Send to backend API
      this.sendReadingToBackend(reading);
    } catch (error) {
      logger.error('Error processing MQTT message:', error);
    }
  }

  /**
   * Send reading to backend API
   */
  private async sendReadingToBackend(reading: DeviceReading): Promise<void> {
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${backendUrl}/api/consumption/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.devices.get(reading.deviceId)?.userId,
          oilQuantityGrams: reading.value,
          oilType: 'unknown',
          mealType: 'unknown',
          source: 'iot_device',
          metadata: reading.metadata,
        }),
      });

      if (!response.ok) {
        logger.error(`Failed to send reading to backend: ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Error sending reading to backend:', error);
    }
  }

  /**
   * Publish command to device
   */
  publishCommand(deviceId: string, command: string, payload: any): void {
    if (!this.mqttClient) {
      logger.error('MQTT client not connected');
      return;
    }

    const topic = `devices/${deviceId}/commands`;
    this.mqttClient.publish(topic, JSON.stringify({ command, payload }));
    logger.info(`Published command to ${deviceId}: ${command}`);
  }

  /**
   * Get device readings
   */
  getReadings(deviceId: string, limit: number = 100): DeviceReading[] {
    return this.readings
      .filter(r => r.deviceId === deviceId)
      .slice(-limit);
  }

  /**
   * Disconnect from MQTT broker
   */
  disconnect(): void {
    if (this.mqttClient) {
      this.mqttClient.end();
      logger.info('Disconnected from MQTT broker');
    }
  }
}

