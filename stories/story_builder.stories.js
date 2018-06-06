import React from 'react';
import { injectIntl } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import fakeUploader from './shared/fakeUploader';
import StoryBuilder from '../src';

const longText = "<p>Mass incarceration; overcome injustice state of play triple bottom line compassion storytelling. Progress, challenges and opportunities dynamic emerging NGO systems thinking. Peaceful impact; black lives matter; revolutionary targeted systems thinking. Efficient or design thinking effective compelling innovation best practices. Resist, resist synergy thought provoking black lives matter problem-solvers social entrepreneurship strategize contextualize. Outcomes parse design thinking black lives matter philanthropy inspirational collective impact. Storytelling innovate low-hanging fruit; strategy replicable. Radical, resist, capacity building energize; engaging dynamic milestones. Deep dive contextualize, systems thinking; the accessibility shared unit of analysis changemaker engaging thought leadership. Capacity building, shared value white paper, movements gender rights shared unit of analysis low-hanging fruit youth problem-solvers. Accessibility agile milestones; challenges and opportunities, milestones social entrepreneurship milestones. B-corp, venture philanthropy mobilize uplift mobilize storytelling low-hanging fruit social enterprise. Communities, correlation parse collaborate, because resist. Transparent design thinking technology thought leadership the resistance. Invest milestones, NGO benefit corporation greenwashing,.</p>";

const demoStory = [
  { id: 'text-1', type: 'text', content: '<p>Gender rights mass incarceration overcome injustice triple bottom line the move the needle. Benefit corporation.</p>' },
  { id: 'image-1', type: 'image', content: 'http://placekitten.com/g/300/300', caption: 'A cat' },
  { id: 'text-2', type: 'text', content: longText },
  { id: 'largeText-3', type: 'largeText', content: 'This text will be very large' },
  { id: 'video-1', type: 'video', content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ymxEmbALjIo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', url: 'https://www.youtube.com/watch?v=ymxEmbALjIo' }
];

const template = [
  { id: 'text-1', type: 'text', content: '<p>Tell me about your life</p>' },
  { id: 'image-1', type: 'image', content: '', caption: 'Add a picture of your house' },
  { id: 'text-2', type: 'text', content: '<p>Say something about politics in Italy</p>' },
  { id: 'largeText-1', type: 'largeText', content: 'What is the takeaway of this story?' },
]

const api = {
  save: (story) => action('story saved')(story),
  imageUploadHandler: fakeUploader
}

const StoryBuilderWrapper = injectIntl(({ intl, ...storyBuilderProps }) => (
  <StoryBuilder locale={intl.locale} api={api} initialState={storyBuilderProps} />
))

storiesOf('StoryBuilder')
  .add('empty', () => (
    <StoryBuilderWrapper
      content_json={[]}
      template={[]}
    />
  ))
  .add('with some elements', () => (
    <StoryBuilderWrapper
      title="Rome: the community based gym hires 15 trainers"
      place="Rome"
      content_json={demoStory}
      template={[]}
    />
  ))
  .add('with a template', () => (
    <StoryBuilderWrapper
      template={template}
      content_json={[]}
    />
  ))
