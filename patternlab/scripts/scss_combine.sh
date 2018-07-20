# loop through your one_ files
topdir="/Users/minghuasun/Documents/Github/mayflower/patternlab/styleguide/source/assets/scss"
dir1="01-atoms"
dir2="06-theme/01-atoms"

for f in $topdir/$dir1/*.scss
do
    outf=$topdir/`basename $f .scss`-concat.scss
    cp $f $outf
    sed -e '1 d' $topdir/$dir2/`basename $f` >> $outf
done

tar czf foo.tar.gz $topdir/*-concat.scss