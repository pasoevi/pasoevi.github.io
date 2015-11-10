---
layout: post
title: Emacs Shortcuts for Writing Posts Using Jekyll
---

One of the good things about static site generators is that they do
not dictate how you write posts and what tools you use. For those who
choose to write posts in Emacs, here are a few function to automate
file creation and other things. 

If in some blogging systems for writing a new post you have to
navigate to the web site, get authenticated, visit the page from which
to create a new post and use the web-based editor, Jekyll allows you
to do 

{% highlight emacs-lisp %}

(defun today-is ()
  "Return current year-month-day."
  (format-time-string "%Y-%m-%d"))

(defun create-new-post ()
  (let ((title
	 (if (string= "" (thing-at-point 'word))
	     (thing-at-point 'word) (car kill-ring))))
    (concat (file-name-as-directory "~/blog/_posts")
	(today-is) "-" title ".md")))

("p" "Post" plain (file  (create-new-post)) 
             "---\nlayout: post\ntitle: %? \n---\n")
	    
{% endhighlight %}

(create-new-post)


--------------------------------------------------------------------------------
(require 'cl)

(defun string/starts-with (string prefix)
  "Return t if STRING starts with prefix."
  (and (string-match (rx-to-string `(: bos ,prefix) t)
		     string)
       t))

(defun is-post-file (filename)
  "Return t if filename is a known markup file for a Jekyll post"
  )

(let ((default-directory "~/blog/_posts"))
    (file-expand-wildcards "*.md"))
(defun filter (condp lst)
  (delq nil
	(mapcar (lambda (x) (and (funcall condp x) x)) lst)))


(let ((post-files (directory-files "~/blog/_posts")))
  (filter 'numberp post-files))

