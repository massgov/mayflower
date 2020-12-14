# Font compression scripts

The scripts below are used to compress and subset fonts with [pyftsubset](https://rsms.me/fonttools-docs/subset.html)

The script takes the specified ttf files, compresses them to only the glyphs  and featuress listed and outputs them in the new format overwriting the old oness in the same directory.

To use:
1. Install the [pyftsubset](https://rsms.me/fonttools-docs/subset.html) CLI
2. In the command line, navigate to the directory containing the fonts in the script you want to optimize
3. First test by running `pyftsubset`. If you get an error you may need to add it to your PATH
4. If not, copy the entire block for a script, paste it to the command line and enter
5. Run git status to test if the font files were updated

# Latin fonts

<!--@todo: update with eot s-->

```
pyftsubset\
  NotoSans.ttf \
  --output-file="NotoSans.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05" &&

pyftsubset\
  NotoSansItalic.ttf \
  --output-file="NotoSansItalic.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05" &&

pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0000-00FF, U+FB00-FB05" &&

pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05" &&

pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05" &&

pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum"\
  --unicodes="U+0000-00FF, U+FB00-FB05"
```
