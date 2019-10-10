branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
lastCommitClean=$lastCommit
lastDependabot=$(git log --author="clairesunstudio" --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
commitType="Changed"

if [[ $lastCommitClean =~ "[Security]"[[:space:]](.*) ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  commitType="Security"
fi

if [[ $lastCommitClean =~ "/react" ]]; then
  lastCommitClean="(React) [Dependency] $lastCommitClean"
fi
if [[ $lastCommitClean =~ "/patternlab" ]]; then
  lastCommitClean="(Patternlab) [Dependency] $lastCommitClean"
fi

if [ "$lastCommit" = "$lastDependabot" ]
then
  printf "\n$commitType\n- $lastCommitClean" >> changelogs/dependabot.md
  git add changelogs/dependabot.md
  git commit -m "Add changelog to changelogs/dependabot.md"
  echo "Commit dependabot changelog";
  git push -u origin $branch
else
  echo "No changelog added"
fi
