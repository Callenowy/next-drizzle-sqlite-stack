import AuthenticationError from './AuthenticationError';

describe('AuthenticationError', () => {
  it('should create an instance of AuthenticationError', () => {
    const error = new AuthenticationError('Test error');

    expect(error).toBeInstanceOf(AuthenticationError);
  });

  it('should have the correct name', () => {
    const error = new AuthenticationError('Test error');

    expect(error.name).toBe('AuthenticationError');
  });

  it('should have the correct message', () => {
    const errorMessage = 'Test error';
    const error = new AuthenticationError(errorMessage);

    expect(error.message).toBe(errorMessage);
  });
});
