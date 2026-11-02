<template>
  <div class="quiz-info">
    <InfoBanner />

    <div class="content flex flex-col justify-center items-center">
      <h3 class="title">Drukkerij</h3>
      <p class="description">
        Je moet je goed bewust zijn van wat jij allemaal moet doen. <br />
        Als drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van
        onderstaande taken behoren echter niet tot het takenpakket, stop er snel
        mee voor je baas het ziet!
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quiz-info {
  background: var(--color-white);
  width: 100%;
  height: 100%;
  min-width: 0;
  border-radius: 8px;
  border: solid 1pt var(--color-black);

  .content {
    padding: 32px 16px 16px;
    gap: 16px;

    .title {
      font-family: "Flanders Art Sans", sans-serif;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: var(--color-blue-dark);

      width: fit-content;
      border-bottom: solid var(--color-blue-medium);
      padding-bottom: 8px;
    }

    .description {
      font-family: "Flanders Art Sans", sans-serif;
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: var(--color-blue-dark);
    }
  }

  // Tablet
  @media (max-width: 1024px) {
    .content {
      padding: 60px 12px 12px;
      gap: 12px;

      .title {
        font-size: 22px;
      }
    }
  }

  // Mobile
  @media (max-width: 767px) {
    height: auto;

    .content {
      padding: 42px 12px 16px;
      gap: 8px;

      .title {
        font-size: 20px;
        line-height: 24px;
        padding-bottom: 4px;
      }

      .description {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  // Small mobile
  @media (max-width: 375px) {
    .content {
      padding: 36px 10px 12px;

      .title {
        font-size: 18px;
      }

      .description {
        font-size: 13px;
        line-height: 19px;
      }
    }
  }
}
</style>
