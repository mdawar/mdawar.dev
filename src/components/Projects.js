import React from 'react';
import { Section, SectionHeader } from '../styles/elements/content';

export default function Projects() {
  return (
    <Section>
      <SectionHeader>
        <h2>Open Source Projects</h2>
      </SectionHeader>
      <h3>
        <a href="https://github.com/mdawar/terraformjs">TerraformJS</a>
      </h3>
      <p>Infrastructure as code using JavaScript and Terraform.</p>
      <h3>
        <a href="https://github.com/mdawar/rq-exporter">RQ Exporter</a>
      </h3>
      <p>Prometheus metrics exporter for Python RQ (Redis Queue).</p>
    </Section>
  );
}
