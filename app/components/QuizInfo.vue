<template>
  <div class="quiz-info">
    <InfoBanner />

    <div class="content flex flex-col justify-center items-center px-4 pt-8">
      <h3 class="title py-4">Drukkerij</h3>
      <span class="py-4">
        Je moet je goed bewust zijn van wat jij allemaal moet doen. <br />
        Als drukafwerker heb je een heel uiteenlopend takenpakket. Sommige van
        onderstaande taken behoren echter niet tot het takenpakket, stop er snel
        mee voor je baas het ziet!
      </span>
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
    .title {
      font-family: "Flanders Art Sans";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;

      text-align: center;

      color: var(--color-blue-dark);

      width: fit-content;
      border-bottom: solid var(--color-blue-medium);
    }

    span {
      font-family: "Flanders Art Sans";
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;

      text-align: center;
      color: var(--color-blue-dark);
    }
  }
}
</style>
