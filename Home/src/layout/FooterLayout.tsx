import styles from '@/scss/layout.module.scss';

const FooterLayout = () => {
  return <footer className={styles.footer}>
    <div>
      Copyright © IDEN YOUNGJIN SEO All rights reserved.
    </div>
    <div>
      <a className={styles.github_icon} href='https://github.com/seo-0jin' target='_blank'>
        <img src='/public/icons/git-hub.png' />
      </a>
    </div>
  </footer>;
};

export default FooterLayout;
