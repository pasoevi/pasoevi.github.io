---
layout: post
title: Guile Cookbook
---
* TOC
{:toc}

# Guile Scheme

## Modules

### Simply Importing modules

    (use-modules (srfi srfi-19))

## Strings

## Time and Date

## IO
    (open-file filename
        (if binary "wb" "w")
            #:encoding encoding)


## Network

### Http requests
    (use-modules (web client))
    (http-get url #:streaming? #t)

### Displaying text
    (display "Guile Cookbook")
    (newline)

# C <-> Scheme
