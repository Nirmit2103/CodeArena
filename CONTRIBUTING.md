# Contributing to CodeArena 🤝

Thank you for considering contributing to CodeArena! We love your input!

## 🌟 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: How to trigger the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version

**Bug Report Template:**
```
## Bug Description
[Clear description]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots
[If applicable]

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Node: [e.g., v18.0.0]
```

### Suggesting Features ✨

We love new ideas! Before suggesting, check if someone else suggested it. Include:

- **Feature Description**: What you want to add
- **Use Case**: Why it's useful
- **Implementation Ideas**: How it might work (optional)
- **Mockups**: Visual ideas (optional)

### Pull Requests 🔄

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our style guide
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request**

## 🚀 Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Setup Steps

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/CodeArena.git
   cd CodeArena
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build and Test**
   ```bash
   npm run build
   npm run preview
   ```

## 📝 Coding Standards

### TypeScript/React Guidelines

- ✅ Use TypeScript for all new files
- ✅ Use functional components with hooks
- ✅ Follow existing naming conventions
- ✅ Keep components small and focused
- ✅ Use meaningful variable names

**Example:**
```typescript
// ✅ Good
interface UserProfileProps {
  userId: string;
  onUpdate: (data: ProfileData) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  // Component logic
};

// ❌ Avoid
function comp(props: any) {
  // Unclear naming, any type
}
```

### File Organization

- Components in `src/components/`
- Utilities in `src/lib/`
- Types in `src/types/`
- State management in `src/store/`

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Keep styles consistent with existing UI

### Git Commit Messages

Use clear, descriptive commit messages:

```bash
# ✅ Good
git commit -m "Add user profile image upload feature"
git commit -m "Fix leaderboard sorting bug"
git commit -m "Update README with deployment instructions"

# ❌ Avoid
git commit -m "fix"
git commit -m "update stuff"
git commit -m "asdfasdf"
```

**Commit Message Format:**
```
<type>: <short description>

[optional detailed description]

[optional issue reference]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🧪 Testing

Before submitting:

1. ✅ Run the app locally and test your changes
2. ✅ Check for console errors
3. ✅ Test on different screen sizes
4. ✅ Verify authentication still works
5. ✅ Run linter: `npm run lint`
6. ✅ Build succeeds: `npm run build`

## 📋 Pull Request Process

1. **Update Documentation**: If you changed functionality
2. **Follow the Template**: Use our PR template
3. **Link Issues**: Reference related issues
4. **Request Review**: Wait for maintainer review
5. **Address Feedback**: Make requested changes
6. **Merge**: Maintainer will merge when approved

**PR Template:**
```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Related Issue
Fixes #[issue number]

## How Has This Been Tested?
[Describe testing process]

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested locally
```

## 🎯 Areas We Need Help

- 🐛 Bug fixes
- 📱 Mobile responsiveness improvements
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- 📝 Documentation
- 🌍 Internationalization
- ⚡ Performance optimization
- 🧪 Test coverage

## 💬 Communication

- **Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Pull Requests**: For code contributions

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Credited in release notes
- Appreciated forever! ❤️

## ❓ Questions?

Feel free to:
- Open an issue with your question
- Start a discussion
- Reach out to maintainers

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Expected Behavior

- ✅ Be respectful and inclusive
- ✅ Be collaborative and constructive
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community

### Unacceptable Behavior

- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing others' private information

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to CodeArena! 🎉**

Every contribution, no matter how small, makes a difference!
