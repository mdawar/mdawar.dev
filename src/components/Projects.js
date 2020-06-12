import React from 'react';
import Link from './Link';
import { Section, SectionHeader } from '../styles/elements/content';

export default function Projects() {
  return (
    <Section>
      <SectionHeader>
        <h2>Open Source Projects</h2>
      </SectionHeader>
      <h3>
        <Link href="https://github.com/mdawar/terraformjs">TerraformJS</Link>
      </h3>
      <p>Infrastructure as code using JavaScript and Terraform.</p>
      <h3>
        <Link href="https://github.com/mdawar/rq-exporter">RQ Exporter</Link>
      </h3>
      <p>Prometheus metrics exporter for Python RQ (Redis Queue).</p>
    </Section>
  );
}
