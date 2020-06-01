import { provider, variable, resource, output } from '@mdawar/terraformjs';

export const token = variable.netlify_token({ type: 'string' });

export const netlify = provider.netlify({ token });

export const site = resource.netlify_site.main({
  name: 'mdawar',
  custom_domain: 'mdawar.dev',

  repo: {
    provider: 'github',
    repo_path: 'mdawar/mdawar.dev',
    repo_branch: 'master'
  }
});

export const siteData = output.site({
  value: site
});
