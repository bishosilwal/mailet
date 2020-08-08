module ApplicationHelper
  def meta_keywords
    keywords = "email,fake,send,mail,temporary,disposable,free,receive,delete,custom,random,generate,image,attachment,security,secure, mailet.in,mailet,quick,anonymous,account,protect,online,identity,trash,generator,throwaway,html form"
    "<meta name='keywords' contents='#{keywords}'/>".html_safe
  end

  def meta_description
    default = "Use free random fake email address to send, receive, delete mail with images and html form. Secure, anonymous, spam free email id generator."
    description = content_for?(:description) ? content_for(:description) : default
    "<meta name='description' content='#{description}' />".html_safe
  end

  def meta_title
    content_tag :title do
      content_for?(:title) ? content_for(:title) : 'Mailet - Temporary Disposable Free Email Address'
    end
  end

  def meta_fb
    '<meta property="og:title" content="Mailet - Temporary Disposable Free Email Address" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.mailet.in" />
    <meta property="og:image" content="https://www.mailet.in/mailet_demo.png" />
    <meta property="og:image:width" content="640" />
    <meta property="og:image:height" content="442" />
    <meta property="og:description" content="Use free temporary disposable random fake email address to send, receive, delete mail with images and richtext. Secure, anonymous, spam free email generator." />
    <meta property="og:site_name" content="Mailet" />'.html_safe
  end

  def meta_twitter
    '<meta name="twitter:card" content="/mailet_demo.png" />
    <meta name="twitter:site" content="" />
    <meta name="twitter:title" content="Mailet - Temporary Disposable Free Email Address" />
    <meta name="twitter:description" content="Use free temporary disposable random fake email address to send, receive, delete mail with images and richtext. Secure, anonymous, spam free email generator." />
    <meta name="twitter:creator" content="Bisho silwal" />
    <meta name="twitter:image:src" content="https://www.mailet.in/mailet_demo.png" />'.html_safe
  end
end
