import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import StoryBuilder from '../src/StoryBuilder/StoryBuilder';

import StoryTags from '../src/StoryTags/StoryTags';
import StoryItem from '../src/StoryItem/StoryItem';
import TextStoryItem from '../src/StoryItem/TextStoryItem';
import ImageStoryItem from '../src/StoryItem/ImageStoryItem';
import VideoStoryItem from '../src/StoryItem/VideoStoryItem';

storiesOf('StoryTags', module)
  .add('empty', () => <StoryTags onSave={action('tags saved')} />)
  .add('pre-initialized', () => (
    <StoryTags
      tags={[{ id: 1, name: 'pregnancy'}, { id: 2, name: 'welfare provisions' }]}
      onSave={action('tags saved')}
    />
  ))
  .add('with autocomplete', () => (
    <StoryTags
      availableTags={[{ id: 1, name: 'pregnancy'}, { id: 2, name: 'welfare provisions' }]}
      onSave={action('tags saved')}
    />
  ))

storiesOf('StoryItem', module)
  .add('default', () => <StoryItem icon="rocket" content="<p>A default story item with some text</p>" />)

const longText = "<p>Mass incarceration; overcome injustice state of play triple bottom line compassion storytelling. Progress, challenges and opportunities dynamic emerging NGO systems thinking. Peaceful impact; black lives matter; revolutionary targeted systems thinking. Efficient or design thinking effective compelling innovation best practices. Resist, resist synergy thought provoking black lives matter problem-solvers social entrepreneurship strategize contextualize. Outcomes parse design thinking black lives matter philanthropy inspirational collective impact. Storytelling innovate low-hanging fruit; strategy replicable. Radical, resist, capacity building energize; engaging dynamic milestones. Deep dive contextualize, systems thinking; the accessibility shared unit of analysis changemaker engaging thought leadership. Capacity building, shared value white paper, movements gender rights shared unit of analysis low-hanging fruit youth problem-solvers. Accessibility agile milestones; challenges and opportunities, milestones social entrepreneurship milestones. B-corp, venture philanthropy mobilize uplift mobilize storytelling low-hanging fruit social enterprise. Communities, correlation parse collaborate, because resist. Transparent design thinking technology thought leadership the resistance. Invest milestones, NGO benefit corporation greenwashing,.</p>";

storiesOf('TextStoryItem', module)
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

const fakeUploader = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    let progress = 0;

    const interval = setInterval(function () {
      console.log('uploading', progress)

      if (progress < 100) {
        progress += 5;
        onProgress(progress);
      } else {
        clearInterval(interval);
        resolve("http://placekitten.com/g/400/400");
      }
    }, 200);
  })
}

storiesOf('ImageStoryItem', module)
  .add('empty', () => (
    <ImageStoryItem
      imageUploadHandler={fakeUploader}
      onSave={action('item saved')}
      onRemove={action('item removed')}
    />
  ))
  .add('default', () => (
    <ImageStoryItem
      content="http://placekitten.com/g/300/300"
      imageUploadHandler={fakeUploader}
      onSave={action('item saved')}
      onRemove={action('item removed')}
    />
  ))
  .add('with some caption', () => (
    <ImageStoryItem
      content="http://placekitten.com/g/300/300"
      caption="A cute little cat, doing good helping the poor"
      imageUploadHandler={fakeUploader}
      onSave={action('item saved')}
      onRemove={action('item removed')}
    />
  ))
  .add('with custom remove behavior', () => (
    <ImageStoryItem
      content="http://placekitten.com/g/300/300"
      imageUploadHandler={fakeUploader}
      onSave={action('item saved')}
      onRemove={(item) => alert(`You have removed me! I was ${item}`)}
    />
  ))

storiesOf('VideoStoryItem')
  .add('empty', () => <VideoStoryItem onSave={() => action('item saved')}/>)
  .add('with a url', () => <VideoStoryItem url="https://www.youtube.com/watch?v=BKTc1OqG-6c" onSave={() => action('item saved')}/>)

const demoStory = [
  { id: 'text-1', type: 'text', content: '<p>Gender rights mass incarceration overcome injustice triple bottom line the move the needle. Benefit corporation.</p>' },
  { id: 'image-1', type: 'image', content: 'http://placekitten.com/g/300/300', caption: 'A cat' },
  { id: 'text-2', type: 'text', content: longText },
  { id: 'largeText-3', type: 'largeText', content: 'This text will be very large' },
  { id: 'video-1', type: 'video', content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ymxEmbALjIo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', url: 'https://www.youtube.com/watch?v=ymxEmbALjIo' }
];

storiesOf('StoryBuilder', module)
  .add('empty', () => (
    <StoryBuilder
      content_json={[]}
      imageUploadHandler={fakeUploader}
      onSave={(state) => {
        action('story saved')(state);
        return Promise.resolve();
      }}
    />
  ))
  .add('with some elements', () => (
    <StoryBuilder
      title="Rome: the community based gym hires 15 trainers"
      place="Rome"
      content_json={demoStory}
      imageUploadHandler={fakeUploader}
      onSave={(state) => {
        action('story saved')(state);
        return Promise.resolve();
      }}
    />
  ))
