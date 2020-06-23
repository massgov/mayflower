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
    Data::setOption('mayflower', [
      'version' => sprintf('v%s', $this->getGitVersion()),
      'releaseDate' => $this->getGitDate('HEAD'),
    ]);
  }

  /**
   * Return the git tag name for the current commit.
   *
   * @return bool|string
   */
  private function getGitVersion() {
    $proc = new Process('git describe --tags');
    $proc->run();
    return $proc->isSuccessful() ? trim($proc->getOutput()) : FALSE;
  }

  /**
   * Return the commit date for the current commit.
   *
   * @param $ref
   *   The branch or tag name.
   *
   * @return bool|string
   */
  private function getGitDate() {
    $proc = new Process('git show -s --format=%ci HEAD');
    $proc->run();
    if($proc->isSuccessful()) {
      $date = new \DateTime($proc->getOutput());
      return $date->format('n/j/Y');
    }
    return FALSE;
  }
}
