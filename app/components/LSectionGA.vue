<script lang="ts" setup>
import useTrackingEvent from '../composables/useTrackingEvent';

const { sendGA } = useTrackingEvent();

function handleTestClick() {
  sendGA({
    action: 'click_btn',
    category: 'term',
    label: 'testing',
  });

  // Visual feedback
  // console.log('GA event sent:', {
  //   action: 'click_btn',
  //   category: 'term',
  //   label: 'testing',
  // });
}
</script>

<template>
  <section class="sec-ga l-article">
    <div class="l-container">
      <div class="sec-ga__content">
        <h2 class="sec-ga__title">GA Testing Section</h2>
        <div class="sec-ga__description">
          <div>Click the button below to trigger a test GA event</div>
          <div>action: <strong>click_btn</strong></div>
          <div>category: <strong>term</strong></div>
          <div>label: <strong>testing</strong></div>
        </div>
        <button type="button" class="sec-ga__btn" @click="handleTestClick">
          Send GA Test Event
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sec-ga {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0;

  &__content {
    text-align: center;
    color: white;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  &__btn {
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: #667eea;
    background: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:focus {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }
}
</style>
