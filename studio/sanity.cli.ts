import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ayyaiy0f',
    dataset: 'production'
  },
  /**
   * The hostname where the studio will be deployed.
   * e.g. loukia-hadjiyianni.sanity.studio
   */
  studioHost: 'loukia-hadjiyianni'
})
