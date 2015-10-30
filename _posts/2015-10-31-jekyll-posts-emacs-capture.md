---
layout: post
title: Emacs Shortcuts for Writing Posts using Jekyll
published: false
---
Ooeu aoeu

{% highlight emacs-lisp %}

(defun today-is ()
  "Return current day."
  (format-time-string "%Y-%m-%d"))

(defun create-new-post ()
  (let ((title
	 (if (string= "" (thing-at-point 'word))
	     (thing-at-point 'word) (car kill-ring))))
    (concat (file-name-as-directory "~/blog/_posts")
	    (today-is) "-" title ".md")))
	    
{% endhighlight %}


Asth aeostuh
