# Contributing to OilWise Platform

We welcome contributions from the community! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/oilwise-platform.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit with clear messages: `git commit -m "feat: description"`
6. Push to your fork: `git push origin feature/your-feature`
7. Create a Pull Request

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Coding Standards

### JavaScript/TypeScript
- Use ESLint configuration provided
- Follow Airbnb style guide
- Use TypeScript for type safety
- Write meaningful variable names
- Add JSDoc comments for functions

```typescript
/**
 * Calculate health risk score
 * @param metrics - User health metrics
 * @returns Risk score (0-100)
 */
function calculateRiskScore(metrics: HealthMetrics): number {
  // Implementation
}
```

### Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Use meaningful variable names

```python
def calculate_risk_score(metrics: Dict[str, float]) -> float:
    """
    Calculate health risk score based on metrics.
    
    Args:
        metrics: Dictionary of health metrics
        
    Returns:
        Risk score between 0 and 100
    """
    # Implementation
```

### Git Commit Messages

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build/dependency changes

Example:
```
feat: add recipe recommendation engine

- Implement collaborative filtering algorithm
- Add user preference extraction
- Create recipe scoring system
```

## Testing

### Write Tests
- Unit tests for functions
- Integration tests for APIs
- E2E tests for user flows
- Aim for >80% code coverage

### Run Tests
```bash
# Backend
cd backend && npm test

# AI Engine
cd ai-engine && pytest

# Mobile App
cd mobile-app && npm test

# Web Dashboard
cd web-dashboard && npm test
```

## Pull Request Process

1. **Update Documentation**
   - Update README if needed
   - Add API documentation
   - Update CHANGELOG

2. **Code Review**
   - Address reviewer comments
   - Keep commits clean
   - Rebase if needed

3. **Testing**
   - All tests must pass
   - Add new tests for new features
   - Test on multiple platforms if applicable

4. **Merge**
   - Squash commits if requested
   - Delete feature branch after merge

## Issue Reporting

### Bug Reports
Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs if applicable

### Feature Requests
Include:
- Clear description
- Use case/motivation
- Proposed solution
- Alternative solutions
- Additional context

## Documentation

### Code Documentation
- Add comments for complex logic
- Use JSDoc/docstrings
- Keep documentation updated

### User Documentation
- Update README for major changes
- Add API documentation
- Create guides for new features

## Performance Guidelines

- Optimize database queries
- Use caching appropriately
- Minimize API calls
- Optimize bundle size
- Profile before optimizing

## Security Guidelines

- Never commit secrets
- Use environment variables
- Validate all inputs
- Use parameterized queries
- Keep dependencies updated
- Report security issues privately

## Deployment

### Staging
- Test on staging environment
- Verify all features work
- Check performance

### Production
- Follow deployment checklist
- Monitor for errors
- Be ready to rollback

## Communication

- Use GitHub Issues for discussions
- Comment on PRs for feedback
- Join our community chat
- Attend community meetings

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in documentation

## Questions?

- Check existing issues/PRs
- Read documentation
- Ask in discussions
- Email: dev@oilwise.in

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to OilWise! 🎉

