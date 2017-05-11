def choose_variant(variants):
    max_L = 0
    max_variant = 0
    import urllib.request
    for i in range(len(variants)):
        search_term = variants[i]
        f = urllib.request.urlopen("https://ca.search.yahoo.com/search;_ylt=A0LEV2uCgCxYfG0AoKXrFAx.;_ylc=X1MDMjExNDcyMTAwMwRfcgMyBGZyA3lmcC10LWZwLUNBLWVuLUNBLWRlZgRncHJpZANOeWJVbndseFJVNmhWRU1ydmc0QmxBBG5fcnNsdAMwBG5fc3VnZwMxMARvcmlnaW4DY2Euc2VhcmNoLnlhaG9vLmNvbQRwb3MDMARwcXN0cgMEcHFzdHJsAwRxc3RybAMyMQRxdWVyeQNlbmdpbmVlcmluZyUyMHNjaWVuY2UEdF9zdG1wAzE0NzkzMTE0OTk-?p="+search_term+"&fr2=sb-top-ca.search&fr=yfp-t-fp-CA-en-CA-def")
        page = f.read().decode("utf-8")
        f.close()
        L = ""
        a = "Next</a><span>"
        b = 'results</span>'
        if a in page and b in page:
            for i in range(page.index(a[len(a)-1])+ 1,           page.index(b(0))):
                L += page[i]
                max_L = max(max_L, L)
                if max_L == L:
                    max_variant = search_term
            
    return search_term
       
       
    
L = ["dog", "cat"]
print(choose_variant(L))
    
    


