# branch=$(git branch | grep \* | cut -d ' ' -f2)
# lastCommit=$(git log --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
# lastCommitClean=$lastCommit
# lastDependabot=$(git log --author="dependabot-preview" --pretty=oneline --abbrev-commit | head -n 1 | cut -c 10-)
branch="dependabot/npm_and_yarn/react/handlebars-4.5.3"
lastCommitClean="[Security] Bump handlebars from 4.0.12 to 4.5.3 in /react"
changeType="Changed"
project=""

if [[ $lastCommitClean =~ "[Security]"[[:space:]](.*) ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  changeType="Security"
fi

if [[ $lastCommitClean =~ (.*)" in /react" ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  project="React"
fi
if [[ $lastCommitClean =~ (.*)" in /patternlab/styleguide" ]]; then
  lastCommitClean="${BASH_REMATCH[1]}"
  project="Patternlab"
fi

changelog="$changeType:
  - project: $project
    component: Dependency
    description: $lastCommitClean
    issue: "
echo $changelog
# if [ "$lastCommit" = "$lastDependabot" ]
# then
  printf "$changelog" > changelogs/dependabot-${branch##*/}.md
  # git add changelogs/dependabot-${branch##*/}.md
  # git commit -m "Added a new changelog to the `changelogs/` folder"
  # echo "Commit dependabot changelog";
  # git push -u origin $branch
# else
#   echo "No changelog added"
# fi
