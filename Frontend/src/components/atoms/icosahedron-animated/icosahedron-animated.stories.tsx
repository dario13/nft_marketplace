import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IcosahedronAnimated } from "./icosahedron-animated";

export default {
  title: "Organisms/IcosahedronAnimated",
  component: IcosahedronAnimated,
} as ComponentMeta<typeof IcosahedronAnimated>;

const Template: ComponentStory<typeof IcosahedronAnimated> = (args) => (
  <IcosahedronAnimated {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

//export const Secondary = () => <IcosahedronAnimated />;