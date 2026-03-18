# Contributing to Endee AI Search & RAG System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Ways to Contribute

### 1. **Report Bugs**
Found a bug? Please create an issue with:
- Detailed description
- Steps to reproduce
- Expected vs. actual behavior
- Your environment (OS, Python version, etc.)
- Stack trace/error logs

### 2. **Suggest Features**
Have an idea? Open an issue with:
- Clear description of the feature
- Use cases and examples
- Why it would be valuable
- Potential implementation approach

### 3. **Improve Documentation**
Help other users by:
- Fixing typos and grammar
- Improving clarity of existing docs
- Adding examples and use cases
- Creating tutorials
- Translating documentation

### 4. **Submit Code**
Contribute improvements through:
- Bug fixes
- Performance optimizations
- New features
- Test improvements
- Code refactoring

### 5. **Test and Review**
Help by:
- Testing new features
- Reviewing pull requests
- Running test suites
- Performance testing
- User acceptance testing

## Getting Started

### 1. Fork the Repository

```bash
# Visit https://github.com/yourusername/endee-search
# Click "Fork" button
# Clone your fork
git clone https://github.com/yourusername/endee-search.git
cd endee-search
```

### 2. Create a Feature Branch

```bash
# Update main branch
git fetch origin
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/improvement-description
```

### 3. Make Your Changes

Follow our code style guidelines:

**Python Code Style**
- Follow PEP 8
- Use descriptive variable/function names
- Add docstrings to functions
- Keep functions focused and small
- Use type hints where possible

**Example:**
```python
def semantic_search(query: str, top_k: int = 5) -> List[Dict]:
    """
    Perform semantic search on documents.
    
    Args:
        query: Search query text
        top_k: Number of results to return
        
    Returns:
        List of search results with scores
    """
    # Implementation
    pass
```

**Comments**
- Write clear comments for complex logic
- Use `# TODO:` for incomplete features
- Use `# FIXME:` for known issues

**Testing**
- Write tests for new features
- Ensure existing tests pass
- Add docstring tests for examples

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add feature: semantic search with filters

- Implement filtering by metadata
- Add filter validation
- Update API documentation
- Add tests for filtering"
```

**Commit Message Format**
```
Type: Brief description

Detailed explanation of changes:
- What was changed
- Why it was changed
- How it was tested
```

**Types:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `perf:`

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Open pull request on GitHub
```

## Pull Request Guidelines

### Before Submitting

- [ ] Make sure code follows style guidelines
- [ ] Run tests: `pytest tests/`
- [ ] Update documentation if needed
- [ ] Add tests for new features
- [ ] Check for linting errors

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Performance improvement

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2

## Testing
How was this tested?

## Screenshots (if applicable)
Before/after screenshots

## Checklist
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No breaking changes
```

## Development Setup

### Install Development Dependencies

```bash
# Install with dev dependencies
pip install -r requirements.txt
pip install pytest pytest-cov black flake8

# Or use development requirements file (if exists)
pip install -r requirements-dev.txt
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_search.py

# Run with verbose output
pytest -v
```

### Code Quality

```bash
# Format code
black .

# Check for linting errors
flake8 app.py embedding.py search.py

# Sort imports
isort .
```

## Code Structure Guidelines

### Directory Organization

```
ai-search-project/
├── app.py                    # Main Flask app
├── config.py                 # Configuration
├── embedding.py              # Embedding module
├── vector_store.py           # Endee integration
├── search.py                 # Search functionality
├── rag.py                    # RAG pipeline
├── init_data.py              # Data initialization
├── templates/                # HTML templates
├── static/                   # CSS/JavaScript
├── tests/                    # Test files
│   ├── test_embedding.py
│   ├── test_search.py
│   ├── test_api.py
│   └── test_rag.py
└── docs/                     # Additional documentation
```

### Module Responsibilities

| Module | Responsibility |
|--------|-----------------|
| embedding.py | Text to vector conversion |
| vector_store.py | Endee database operations |
| search.py | Query processing and search logic |
| rag.py | LLM integration and RAG |
| app.py | Flask routes and API |

## Documentation Guidelines

### Docstring Format

Use Google-style docstrings:

```python
def function_name(param1: str, param2: int) -> dict:
    """
    Brief description.
    
    Longer description explaining what the function does,
    including any important notes about usage.
    
    Args:
        param1: Description of param1
        param2: Description of param2
        
    Returns:
        Description of return value
        
    Raises:
        ValueError: When invalid parameters provided
        
    Example:
        >>> result = function_name("test", 5)
        >>> print(result)
    """
    pass
```

### README.md Guidelines

- Keep it concise but comprehensive
- Update table of contents
- Include code examples
- Add badges/status indicators
- Keep links current

### Comment Guidelines

```python
# Use single-line comments for short explanations
# Use multiple lines for longer descriptions

# ==================== Section Header ====================
# Use this format for major sections

# TODO: Future improvement
# FIXME: Known issue that needs attention
# NOTE: Important implementation detail
```

## Performance Considerations

When contributing code, consider:

1. **Vector Operations**
   - Batch operations when possible
   - Use NumPy for numerical operations
   - Cache embeddings when appropriate

2. **API Performance**
   - Minimize database queries
   - Use efficient data structures
   - Implement caching

3. **Memory Usage**
   - Stream large datasets
   - Clean up resources
   - Monitor memory growth

4. **Search Performance**
   - Optimize similarity calculations
   - Use metadata filters to reduce search space
   - Profile bottlenecks

## Security Guidelines

When contributing, ensure:

1. **No Secrets in Code**
   - Use environment variables for secrets
   - Never commit API keys or passwords
   - Review `.gitignore` before committing

2. **Input Validation**
   - Validate all user inputs
   - Sanitize data before processing
   - Check query string parameters

3. **Safe Dependencies**
   - Update dependencies regularly
   - Check for security vulnerabilities
   - Verify package authenticity

4. **Error Handling**
   - Don't expose sensitive info in errors
   - Log securely
   - Handle exceptions gracefully

## Testing Requirements

### For Bug Fixes
- Add test that reproduces the bug
- Verify test fails with original code
- Verify test passes with fix

### For New Features
- Add unit tests for business logic
- Add integration tests for API endpoints
- Aim for >80% code coverage
- Test edge cases and error conditions

### Test Example

```python
import pytest
from search import semantic_search

class TestSemanticSearch:
    
    def test_search_returns_results(self):
        """Test that search returns results for valid query."""
        results = semantic_search("machine learning")
        assert len(results) > 0
        assert all('score' in r for r in results)
    
    def test_search_empty_query_returns_empty(self):
        """Test that empty query returns empty results."""
        results = semantic_search("")
        assert len(results) == 0
    
    def test_search_respects_top_k(self):
        """Test that search respects top_k parameter."""
        results = semantic_search("test", top_k=3)
        assert len(results) <= 3
    
    @pytest.mark.parametrize("top_k", [-1, 0, 1001])
    def test_search_invalid_top_k(self, top_k):
        """Test that invalid top_k raises error."""
        with pytest.raises(ValueError):
            semantic_search("test", top_k=top_k)
```

## Release Process

1. Update version number in relevant files
2. Update CHANGELOG
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release with notes

## Community

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General questions, ideas
- **Discord** (future): Real-time chat for community
- **Email**: For private concerns

### Code of Conduct

All contributors must follow our Code of Conduct:
- Be respectful and inclusive
- Welcome diverse perspectives
- Address conflicts constructively
- No harassment or discrimination
- Report violations to [email]

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Commit history

## Resources

- [GitHub Documentation](https://docs.github.com)
- [Forking a Repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
- [PEP 8 Style Guide](https://pep8.org/)
- [Python Docstring Conventions](https://stackoverflow.com/questions/3898572)

## Questions?

Don't hesitate to:
- Ask in GitHub Discussions
- Comment on issues
- Create a draft PR to discuss changes
- Join our Discord community

Thank you for contributing! 🎉
