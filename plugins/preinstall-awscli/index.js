module.exports = {
  onPreInstall: async () => {
    console.log('Installing AWS CLI via pip3 before install...');
    const { execSync } = require('child_process');
    execSync('pip3 install --user awscli', { stdio: 'inherit' });
  },
};
