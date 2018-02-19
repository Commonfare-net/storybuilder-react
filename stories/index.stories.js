import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import StoryBuilder from '../src/StoryBuilder/StoryBuilder';
import StoryItem from '../src/StoryItem/StoryItem';
import TextStoryItem from '../src/StoryItem/TextStoryItem';
import ImageStoryItem from '../src/StoryItem/ImageStoryItem';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
//
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('StoryItem', module)
  .add('default', () => <StoryItem icon="rocket" content="<p>A default story item with some text</p>" />)

const longText = "<p>Mass incarceration; overcome injustice state of play triple bottom line compassion storytelling. Progress, challenges and opportunities dynamic emerging NGO systems thinking. Peaceful impact; black lives matter; revolutionary targeted systems thinking. Efficient or design thinking effective compelling innovation best practices. Resist, resist synergy thought provoking black lives matter problem-solvers social entrepreneurship strategize contextualize. Outcomes parse design thinking black lives matter philanthropy inspirational collective impact. Storytelling innovate low-hanging fruit; strategy replicable. Radical, resist, capacity building energize; engaging dynamic milestones. Deep dive contextualize, systems thinking; the accessibility shared unit of analysis changemaker engaging thought leadership. Capacity building, shared value white paper, movements gender rights shared unit of analysis low-hanging fruit youth problem-solvers. Accessibility agile milestones; challenges and opportunities, milestones social entrepreneurship milestones. B-corp, venture philanthropy mobilize uplift mobilize storytelling low-hanging fruit social enterprise. Communities, correlation parse collaborate, because resist. Transparent design thinking technology thought leadership the resistance. Invest milestones, NGO benefit corporation greenwashing,.</p>";

storiesOf('TextStoryItem', module)
  .add('default', () => <TextStoryItem content="<p>This is my text</p>" onChange={action('changed')} onSave={action('item saved')} />)
  .add('with long text', () => <TextStoryItem content={longText} onChange={action('changed')} onSave={action('item saved')} />)

storiesOf('ImageStoryItem', module)
  .add('default', () => <ImageStoryItem content="http://placekitten.com/g/200/300" onSave={action('item saved')} />)

const demoStory = [
  { type: 'text', content: '<p>Rome: the community based gym hires 15 trainers</p>' },
  { type: 'text', content: '<p>Gender rights mass incarceration overcome injustice triple bottom line the move the needle. Benefit corporation.</p>' },
  { type: 'image', content: 'http://placekitten.com/g/200/300' },
  { type: 'text', content: longText }
];

storiesOf('StoryBuilder', module)
  .add('empty', () => <StoryBuilder story={[]}/>)
  .add('with some elements', () => <StoryBuilder story={demoStory} onSave={action('story saved')}/>)
