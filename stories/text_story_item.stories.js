import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextStoryItem from '../src/StoryItem/TextStoryItem';

const longText = `<p>Leverage initiative program area and collaborative consumption circular white paper. Shared vocabulary accessibility; shine venture philanthropy, efficient co-create game-changer activate, unprecedented challenge cultivate social entrepreneur thought leader gender rights do-gooder. Indicators, external partners, overcome injustice social capital shine.</p>

<p>Social intrapreneurship; vibrant technology, unprecedented challenge shared value disrupt incubator when. Inspire, or inspirational green space change-makers inspirational. Design thinking circular challenges and opportunities boots on the ground strengthening infrastructure problem-solvers youth save the world living a fully ethical life support. Milestones LGBTQ+ granular strategize low-hanging fruit. Resilient program areas external partners resilient overcome injustice unprecedented challenge, sustainable; disrupt changemaker resilient we must stand up design thinking.</p>

<p>Best practices, save the world mobilize circular milestones. Relief resilient, energize collaborative cities academic, invest change-makers; social entrepreneurship black lives matter incubator social innovation to. Contextualize preliminary thinking social intrapreneurship human-centered support granular shared value theory of change unprecedented challenge activate save the world. Justice, youth; paradigm, social entrepreneur social entrepreneurship indicators strategy issue outcomes state of play. Justice; leverage triple bottom line impact investing, we must stand up change-makers social intrapreneurship game-changer preliminary thinking invest innovation cultivate changemaker collaborate. We must stand up, outcomes academic our work big data, benefit corporation; bandwidth; correlation rubric ecosystem because inspirational empower communities empathetic. Strategy, activate LGBTQ+, global policymaker game-changer.</p>`;

storiesOf('TextStoryItem')
  .add('default', () => (
    <TextStoryItem
      content="<p>This is my text</p>"
      onChange={action('changed')}
      onSave={action('item saved')}
    />
  ))
  .add('with long text', () => (
    <TextStoryItem content={longText}
      onChange={action('changed')}
      onSave={action('item saved')}
    />
  ))
