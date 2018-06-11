<?php

namespace PatternLab;

use Symfony\Component\Process\Process;

/**
 * Sets PL data dynamically, based on info from the environment.
 *
 * This allows us to avoid changes to data.json during the normal release
 * workflow.  Note that options set in data.json will override these properties.
 */
class DynamicDataListener extends Listener {

  public function __construct() {
    // Note: There can only be one listener per event.
    $this->addListener('data.gatherStart', 'gatherData');
  }

  public function gatherData() {
    $this->setDomain();
    $this->setMayflowerRelease();
  }

  /**
   * Read domain from an environment variable and set into data.
   */
  public function setDomain() {
    $baseUrl = getenv('BASE_URL');
    if($baseUrl) {
      $parts = parse_url($baseUrl) + [
        'scheme' => 'https',
        'host' => 'mayflower.digital.mass.gov',
        'path' => '/'
      ];
      $domain = sprintf('%s://%s', $parts['scheme'], $parts['host']);
    }
    else {
      $domain = '';
    }


    Data::setOption('url', [
      'domain' => $domain,
      // Many places expect this path with no leading or trailing slashes.
      'assetsPath' => trim(trim($parts['path'], '/') . '/assets', '/'),
    ]);
    Data::setOption('urlDomain', $domain);
    Data::setOption('urlPath', $parts['path']);
  }

  /**
   * Read version from package.json and set into data.
   */
  public function setMayflowerRelease() {
    $package = json_decode(file_get_contents(__DIR__.'/../../../package.json'));
    $version = $package->version;
    $date = $this->getGitDate('HEAD');

    // If we're not on the exact commit that represents the version tag, denote
    // that this is a dev version.
    if($version === $this->getGitTag()) {
      $version = sprintf('v%s', $version);
    }
    else {
      $version = sprintf('v%s-dev', $version);
    }

    Data::setOption('mayflower', [
      'version' => $version,
      'releaseDate' => $date,
    ]);
  }

  /**
   * Return the git tag name for the current commit.
   *
   * @return bool|string
   */
  private function getGitTag() {
    $proc = new Process('git describe --tags --exact-match');
    $proc->run();
    return $proc->isSuccessful() ? trim($proc->getOutput()) : FALSE;
  }

  /**
   * Return the last commit date for a tag or branch.
   *
   * @param $ref
   *   The branch or tag name.
   *
   * @return bool|string
   */
  private function getGitDate($ref) {
    $proc = new Process('git show -s --format=%ci ' . escapeshellarg($ref));
    $proc->run();
    if($proc->isSuccessful()) {
      $date = new \DateTime($proc->getOutput());
      return $date->format('n/j/Y');
    }
    return FALSE;
  }
}
