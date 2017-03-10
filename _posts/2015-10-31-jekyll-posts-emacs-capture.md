---
layout: post
comments: true
title: Emacs Shortcuts for Writing Posts Using Jekyll
description: An easy way to add shortcuts to Emacs for writing blog posts using Jekyll
category: "Programming"
ads: false
tags: [Jekyll, Emacs, Writing]
---

One of the advantages of static site generators is that they do not
dictate how you write posts and what tools you use. For those who
choose to write posts in Emacs, here are a few functions to automate
file creation, finding and resuming the drafts and marking them as
published.

<!--more-->

If in some blogging systems writing a new post means that you have to
navigate to the web site, get authenticated, visit the page from which
to create a new post and use the web-based editor, with some
configuration Jekyll allows you to do the same with only a few
keystrokes without ever leaving Emacs.

## Using Org Capture

One approach is to add a capture template which is usually bound to
`Control-C c`.

{% highlight emacs-lisp %}

(defun today-is ()
  "Return current year-month-day."
  (format-time-string "%Y-%m-%d"))

(defun jekyll-new ()
  (let ((title
	 (if (string= "" (thing-at-point 'word))
	     (thing-at-point 'word) (car kill-ring))))
    (concat (file-name-as-directory "~/blog/_posts")
	(today-is) "-" title ".md")))

(setq org-capture-templates
	("p" "Post" plain (file  (jekyll-new))
	 "---\nlayout: post\ntitle: %? \n---\n"))

{% endhighlight %}

The above function automatically creates the file in the `_posts`
directory with the file name containing today's date and the short
title of the post which is assumed to be at the top of the kill-ring.

## Finding Drafts

It is possible to further integrate it with Emacs by writing a
function that displays a list of posts in the drafts directory and
provides an easy way to choose a post to resume.

{% highlight emacs-lisp %}

(defun jekyll-drafts ()
  (let ((default-directory "~/blog/_drafts"))
  (file-expand-wildcards "*.md")))


(defun jekyll-resume (post)
  "Resume writing one of the posts from the Jekyll drafts directory"
  (interactive
   (list (completing-read "Post to resume: "
                          (jekyll-drafts) nil t "")))
    (find-file (concat (file-name-as-directory "~/blog/_drafts") post)))


{% endhighlight %}

## Marking Post Drafts as Published

Another convenience function can be defined to move finished drafts to
the `_posts` directory.

{% highlight emacs-lisp %}

(defun jekyll-mark-published (post)
  "Mark one of the posts from the Jekyll drafts directory as published.
   This actually means moving the post from the _drafts to the _posts 
   directory."
  (interactive
   (list (completing-read "Post to mark as published: "
                          (jekyll-drafts) nil t "")))
  (copy-file (concat (file-name-as-directory "~/blog/_drafts") post)
             (concat (file-name-as-directory "~/blog/_posts") post)))

{% endhighlight %}

The above functions can be called from `Meta-X` or a key binding
could be added for it.
