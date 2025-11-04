<script setup>
import {
  NmdHamburger,
  NmdHeader,
  NmdHeaderShare,
  NmdMenu,
  NmdMenuItem,
  NmdProgressbar,
} from '@udn-digital-center/common-components';
import { shareURL_fb, shareURL_line, shareURL_twitter } from '@/utils/share';
import str from '@/locales/common.json';

const menu = [
  {
    title: str.navbarMenu1Text,
    link: str.navbarMenu1Link,
  },
  {
    title: str.navbarMenu2Text,
    link: str.navbarMenu2Link,
  },
];
</script>

<template>
  <div class="ls-header">
    <NmdProgressbar />
    <NmdHeader>
      <NmdHeaderShare
        :facebook="{ href: shareURL_fb }"
        :line="{ href: shareURL_line, target: '_blank' }"
        :twitter="{ href: shareURL_twitter }"
      />
      <NmdHamburger />
    </NmdHeader>
    <NmdMenu>
      <NmdMenuItem v-for="(item, index) in menu" :key="index" :to="item.link">
        {{ item.title }}
      </NmdMenuItem>
    </NmdMenu>
  </div>
</template>
