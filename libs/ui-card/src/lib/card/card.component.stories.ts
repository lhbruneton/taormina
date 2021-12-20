import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'CardComponent',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CardComponent>;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  component: CardComponent,
  props: args,
});

export const FaceUp = Template.bind({});
FaceUp.args = {};

export const FaceDown = Template.bind({});
FaceDown.args = {};
