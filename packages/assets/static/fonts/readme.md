# Font optimization scripts

The scripts below are used to compress and subset fonts with [pyftsubset](https://rsms.me/fonttools-docs/subset.html)

The script takes the specified ttf files, compresses them to only the glyphs  and featuress listed and outputs them in the new format overwriting the old oness in the same directory.

To use:
1. Install the [pyftsubset](https://rsms.me/fonttools-docs/subset.html) CLI
2. In the command line, navigate to the directory containing the fonts in the script you want to optimize
3. First test by running `pyftsubset`. If you get an error you may need to add it to your PATH
4. If not, copy the entire block for a script, paste it to the command line and enter
5. Run git status to test if the font files were updated

To subset eot files upload the ttf to [fontsquirrel](https://www.fontsquirrel.com), use the "expert" tab and change only these values:
- Font-formats: 			eot compressed
- Truetype hinting: 	keep existing
- Vertical metrics: 	no adjustment
- Subsetting:					custom subsetting
-	Unicode ranges:			copy/paste pyftsubset "--unicodes" attributes
- open type features:	copy/paste pyftsubset "--layout-featuress" attributes
- Font name suffix:		-subset

When your kit downloads, move only the font files into Mayflower and change the casing on the font names to title case.

### Arabic

All of the layout features starting with "v" are for language direction (RTL)

```
pyftsubset\
  NotoSansArabic-Regular.ttf \
  --output-file="NotoSansArabic-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F" &&
pyftsubset\
  NotoSansArabic-Bold.ttf \
  --output-file="NotoSansArabic-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F" &&
pyftsubset\
  NotoSansArabic-VF.ttf \
  --output-file="NotoSansArabic-VF-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F" &&
pyftsubset\
  NotoSansArabic-Regular.ttf \
  --output-file="NotoSansArabic-Regular-subset.woff2" \
  --flavor=woff2 \
	--layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F" &&
pyftsubset\
  NotoSansArabic-Bold.ttf \
  --output-file="NotoSansArabic-Bold-subset.woff2" \
  --flavor=woff2 \
	--layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F" &&
pyftsubset\
  NotoSansArabic-VF.ttf \
  --output-file="NotoSansArabic-VF-subset.woff2" \
  --flavor=woff2 \
	--layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0600-06FF, U+0750-077F"
```

### Cyrillic

```
pyftsubset\
  NotoSansCyrillic-Regular.ttf \
  --output-file="NotoSansCyrillic-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansCyrillic-Bold.ttf \
  --output-file="NotoSansCyrillic-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansCyrillic-Regular.ttf \
  --output-file="NotoSansCyrillic-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansCyrillic-Bold.ttf \
  --output-file="NotoSansCyrillic-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansCyrillic-VF.ttf \
  --output-file="NotoSansCyrillic-VF-subset.woff" \
  --flavor=woff \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn," \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansCyrillic-VF.ttf \
  --output-file="NotoSansCyrillic-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0400-04FF, U+0500-052F, U+1C80-1C8F"
```

### Greek

```
pyftsubset\
  NotoSansGreek-Regular.ttf \
  --output-file="NotoSansGreek-Regular.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
pyftsubset\
  NotoSansGreek-Bold.ttf \
  --output-file="NotoSansGreek-Bold.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
pyftsubset\
  NotoSansGreek-Regular.ttf \
  --output-file="NotoSansGreek-Regular.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
pyftsubset\
  NotoSansGreek-Italic.ttf \
  --output-file="NotoSansGreek-Bold.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
pyftsubset\
  NotoSansGreek-VF.ttf \
  --output-file="NotoSansGreek-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0370-03FF, U+1F00-1FFF" &&
pyftsubset\
  NotoSansGreek-VF.ttf \
  --output-file="NotoSansGreek-VF-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn," \
  --unicodes="U+0370-03FF, U+1F00-1FFF"
```

### Hebrew

All of the layout features starting with "v" are for language direction (RTL)

```
pyftsubset\
  NotoSansHebrew-Regular.ttf \
  --output-file="NotoSansHebrew-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05" &&
pyftsubset\
  NotoSansHebrew-Bold.ttf \
  --output-file="NotoSansHebrew-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05" &&
pyftsubset\
  NotoSansHebrew-VF.ttf \
  --output-file="NotoSansHebrew-VF-subset.woff" \
  --flavor=woff \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05" &&
pyftsubset\
  NotoSansHebrew-Regular.ttf \
  --output-file="NotoSansHebrew-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05" &&
pyftsubset\
  NotoSansHebrew-Bold.ttf \
  --output-file="NotoSansHebrew-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05" &&
pyftsubset\
  NotoSansHebrew-VF.ttf \
  --output-file="NotoSansHebrew-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="curs,mset,rclt,rlig,isol,init,medi,fina,valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm" \
  --unicodes="U+0590-05"
```

### Khmer

```
pyftsubset\
  NotoSansKhmer-Regular.ttf \
  --output-file="NotoSansKhmer-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&
pyftsubset\
  NotoSansKhmer-Bold.ttf \
  --output-file="NotoSansKhmer-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&
pyftsubset\
  NotoSansKhmer-VF.ttf \
  --output-file="NotoSansKhmer-VF-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar," \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&
pyftsubset\
  NotoSansKhmer-Regular.ttf \
  --output-file="NotoSansKhmer-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&
pyftsubset\
  NotoSansKhmer-Bold.ttf \
  --output-file="NotoSansKhmer-Bold-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1780-17FF, U+19E0-19FF" &&
pyftsubset\
  NotoSansKhmer-VF.ttf \
  --output-file="NotoSansKhmer-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1780-17FF, U+19E0-19FF"
```

### Latin Greek Cyrillic

These make very large files so we sspilit them up into Latin, Greek, and Cyrillic subsets

```
pyftsubset\
  NotoSansLGC-VF.ttf \
  --output-file="NotoSansLGC-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D, U+0370-03FF, U+1F00-1FFF, U+0400-04FF, U+0500-052F, U+1C80-1C8F" &&
pyftsubset\
  NotoSansLGC-VF.ttf \
  --output-file="NotoSansLGC-subset.woff2 " \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,smcp,c2sc,pcap,c2pc,unic,cpsp,case,ital,ordn" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D, U+0370-03FF, U+1F00-1FFF, U+0400-04FF, U+0500-052F, U+1C80-1C8F"
```

### Latin

```
pyftsubset\
  NotoSans-Regular.ttf \
  --output-file="NotoSans-Regular.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSans-Italic.ttf \
  --output-file="NotoSans-Italic.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum,"\
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSans-Regular.ttf \
  --output-file="NotoSans-Regular.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSans-Italic.ttf \
  --output-file="NotoSans-Italic.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSans-VF.ttf \
  --output-file="NotoSans-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSansItalic-VF.ttf \
  --output-file="NotoSansItalic-VF.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D"
```

### Mono (Latin)

```
pyftsubset\
  NotoSansMono-VF.ttf \
  --output-file="NotoSansMono-subset.woff" \
  --flavor=woff \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D" &&
pyftsubset\
  NotoSansMono-VF.ttf \
  --output-file="NotoSansMono-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,clig,lnum,tnum" \
  --unicodes="U+0000-00FF, U+FB00-FB05, U+2018-2019, U+201C-201D"
```

### Myanmar

```
pyftsubset\
  NotoSansMyanmar-Regular.ttf \
  --output-file="NotoSansMyanmar-Regular-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&
pyftsubset\
  NotoSansMyanmar-Bold.ttf \
  --output-file="NotoSansMyanmar-Bold-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&
pyftsubset\
  NotoSansMyanmar-VF.ttf \
  --output-file="NotoSansMyanmar-VF-subset.woff" \
  --flavor=woff \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar,"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&
pyftsubset\
  NotoSansMyanmar-Regular.ttf \
  --output-file="NotoSansMyanmar-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&
pyftsubset\
  NotoSansMyanmar-Regular.ttf \
  --output-file="NotoSansMyanmar-Regular-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar" \
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF" &&
pyftsubset\
  NotoSansMyanmar-VF.ttf \
  --output-file="NotoSansMyanmar-VF-subset.woff2" \
  --flavor=woff2 \
  --layout-features="abvf,abvm,abvs,blwf,blwm,blws,pref,pres,psts,pstf,dist,akhn,haln,half,nukt,rkrf,rphf,vatu,cjct,cfar"\
  --unicodes="U+1000-109F, U+AA60-AA7F, U+A9E0-A9FF"
```


``--layout-features="valt,vhal,vpal,vert,vrt2,vrtr,vkrn,ltra,ltrm,rtla,rtlm"` // for RTL
