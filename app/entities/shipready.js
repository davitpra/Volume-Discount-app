export class ShipReady {
  constructor(admin, session) {
    this.admin = admin;
    this.session = session;
  }

  async verifyAppEmbed() {    
    try {
      // Check if the store app embed is active
      const allThemes = await this.admin.rest.resources.Theme.all({
        session: this.session,
      });

      if (!allThemes || !allThemes.data) {
        console.error('No themes data returned');
        return [];
      }

      const activeTheme = allThemes.data.find((theme) => theme.role === 'main');

      if (!activeTheme) {
        console.error('No active theme found');
        return [];
      }

      let settings_data = await this.admin.rest.resources.Asset.all({
        session: this.session,
        theme_id: activeTheme.id,
        asset: {"key": "config/settings_data.json"},
      });

      if (!settings_data || !settings_data.data) {
        console.error('No settings data returned');
        return [];
      }

      let myAppEmbeds = [];
      
      const appBlocks = JSON.parse(settings_data.data[0].value)?.current?.blocks;
      if (appBlocks) {
        const appBlocksArray = Object.values(appBlocks);
        myAppEmbeds = appBlocksArray.filter((block) => block.type.includes(process.env.SHOPIFY_THEME_APP_EXTENSION_ID));
      } else {
        console.error('appBlocks is undefined');
      }
    
      return myAppEmbeds;
    } catch (error) {
      console.error('Error during app embed verification:', error);
      return [];
    }
  }
}
