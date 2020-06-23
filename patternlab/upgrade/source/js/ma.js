const ma = {};
// path to where the handlebar templates are being stored.
ma.themePath = "../..";
// path to where twig templates are being stored (for twigJS).
ma.twigPath = "../../twig";
ma.iconPath = ma.themePath + "/images/svg-icons/"
ma.patternPaths = {
  '@base': ma.twigPath + "/00-base/",
  '@atoms': ma.twigPath + "/01-atoms/",
  '@molecules': ma.twigPath + "/02-molecules/",
  '@organisms': ma.twigPath + "/03-organisms/",
  '@templates': ma.twigPath + "/04-templates/",
  '@pages': ma.twigPath + "/05-pages/",
  '@meta': ma.twigPath + "/07-meta/"
};

export default ma;