class IndexService {
  async welcomePage(): Promise<string> {
    return 'Welcome to the API! 🚀';
  }
}

export default new IndexService();
