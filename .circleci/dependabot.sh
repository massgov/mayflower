branch=$(git branch | grep \* | cut -d ' ' -f2)
lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
lastDependabot=$(git log --author="dependabot-preview" --pretty=oneline --abbrev-commit | head -n 1)
commitType="Changed"

if [[ $lastCommit =~ "[Security]"[[:space:]](.*) ]]; then
  lastCommit="${BASH_REMATCH[1]}"
  commitType="Security"
fi

if [[ $lastCommit =~ "/react" ]]; then
  lastCommit="(React) $lastCommit"
fi
if [[ $lastCommit =~ "/patternlab" ]]; then
  lastCommit="(Patternlab) $lastCommit"
fi



if [ "$lastCommit" ]
then
  printf "$commitType\n- [Dependency] $lastCommit" >> changelogs/dependabot.md
  git add changelogs/dependabot.md
  # git commit -m "Add changelog to changelogs/dependabot.md"
  # echo "Commit dependabot changelog";
  # git push -u origin $branch
else
  echo "No changelog added"
fi
