import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListSellCard } from "./list-sell-card";

export default {
  title: "Organisms/ListSellCard",
  component: ListSellCard,
} as ComponentMeta<typeof ListSellCard>;

const Template: ComponentStory<typeof ListSellCard> = (args) => (
  <ListSellCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

//export const Secondary = () => <ListSellCard />;