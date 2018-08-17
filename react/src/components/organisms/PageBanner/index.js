import React from 'react';
import PropTypes from 'prop-types';

// import child components
import DecorativeLink from '../../atoms/links/DecorativeLink';
import PublishState from '../../atoms/text/PublishState';

const PageBanner = (pageBanner) => {
  const sizeClass = pageBanner.size ? `ma__page-banner--${pageBanner.size}` : '';
  const colorClass = pageBanner.color ? `ma__page-banner--${pageBanner.color}` : '';
  const linkedClass = pageBanner.primaryLink ? "ma__page-banner--linked" : '';

  return(
    <section className={`ma__page-banner ${sizeClass} ${colorClass} ${linkedClass}`}>
     { pageBanner.size == "columns" || linkedClass ? (
        <style dangerouslySetInnerHTML={{__html: `
          .ma__page-banner__image {
            background-image: url('https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg');
          }
          @media (min-width: 801px) {
            .ma__page-banner__image {
              background-image: url('https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg');
            }
          }
      `}} />
      ) : (
       <style dangerouslySetInnerHTML={{__html: `
          .ma__page-banner {
            background-image: url('https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg');
          }

          @media (min-width: 801px) {
            .ma__page-banner {
              background-image: url('https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg');
            }
          }
        `}} />
      )}
      <div className="ma__page-banner__container">
        { pageBanner.size == "columns" || linkedClass && (
          <div className="ma__page-banner__image"></div>
        )}
        <div className="ma__page-banner__content" property="mainEntityOfPage">
          <div className="ma__page-banner__content-wrapper">
            { pageBanner.icon && (
              <div className="ma__page-banner__icon">
                {icon(pageBanner.icon)}
              </div>
            )}
            <h1 className="ma__page-banner__title">
              { pageBanner.title }
              { pageBanner.titleSubText && (
                <abbr title={pageBanner.title}>{pageBanner.titleSubText}</abbr>
              )}
            </h1>
            { pageBanner.primaryLink && (pageBanner.size == "columns") && pageBanner.primaryLink.href ? (
                <DecorativeLink {...pageBanner.primaryLink} />
              ) : (
               <p className="ma__page-banner__unlinked-title">
                { pageBanner.primaryLink.text }
               </p>
            )}
            { pageBanner.primaryLink.description && (
              <div className="ma__page-banner__description">
                { pageBanner.primaryLink.description}
              </div>
            )}
            { pageBanner.secondaryLink && pageBanner.size != "columns" && pageBanner.secondaryLink.href ? (
                <DecorativeLink {...pageBanner.secondaryLink} />
              ) : (
                <p className="ma__page-banner__unlinked-title">
                  { pageBanner.secondaryLink.text }
                </p>
              )}
              { pageBanner.secondaryLink.description && (
                <div className="ma__page-banner__description">
                  { pageBanner.secondaryLink.description }
                </div>
              )}
            { pageBanner.description && pageBanner.size != "columns" && (
              <p className="ma__page-banner__description">
                { pageBanner.description }
                { pageBanner.descriptionSubText && (
                  <span className="ma__page-banner__descriptionSubText">
                    { pageBanner.descriptionSubText }
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
        { pageBanner.description && pageBanner.size == "columns" && (
          <p className="ma__page-banner__description">
            { pageBanner.description }
          </p>
        )}
      </div>
    </section>
  )
}


export default PageBanner;
