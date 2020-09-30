
module.exports = async (page, scenario, vp) => {
  await page.setRequestInterception(true);
  page.on('request', interceptRequest);
};

function escapeRegexp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

const banned = [
  'www.googletagmanager.com',
  'script.crazyegg.com',
  'www.google-analytics.com',
  'js-agent.newrelic.com',
  'translate.google.com',
  'foresee.com',
  'www.youtube.com',
  'bam.nr-data.net',
  'maps.googleapis.com',
  '9p83os0fkf.execute-api.us-east-1.amazonaws.com/v1/waittime',
  'public.tableau.com/javascripts'
];
// Block scripts that do analytics tracking, have side effects based on
// domain, or cause timeouts on page load because they load in lots of extra
// stuff.
const bannedRE = new RegExp(banned.map(escapeRegexp).join('|'))

async function interceptRequest(request) {
  let urlMatch;
  // Replace static maps with a placeholder image of the same size.
  if(urlMatch = request.url().match(/maps\.googleapis\.com\/maps\/api\/staticmap.*size=(\d+x\d+)/)) {
    request.respond({
      status: 301,
      headers: {"Location": `https://via.placeholder.com/${urlMatch[1]}/B2DEA2.png?text=Static%20Map`}
    });
    return;
  }
  // Conditionally block requests if they match our regex.
  if(bannedRE.test(request.url())) {
    request.abort();
  } else {
    request.continue();
  }
}
