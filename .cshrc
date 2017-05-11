# The original copy of this file is in "/share/skel/cshrc".
# It should be copied into your home directory using the file name ".cshrc".
# The ".cshrc" file is executed BEFORE executing your ".login" file
# when you log in.  It is also executed every time you start a C-shell.
# In contrast, your ".login" file is executed only once at the beginning
# of a session.
#
# ECF recommends that you do not make any changes to this file.
# Instead, you may add custom features (if you wish) in a file
# in your home directory with the file name ".mycshrc".
# This file (your ".cshrc") will execute any ".mycshrc" file automatically.
# If ECF makes major changes (new hardware, etc), you may be asked to
# update your ".cshrc" file from the updated version of "/share/skel/cshrc".
# In particular, the line in this file which sources "/share/skel/csh.updates"
# is important to allow you access to new features without always having
# to make new copies of your ".cshrc" file.
#
# set up standard initial path (put local stuff first, vendor stuff later)
# set path=( /share/bin /local/bin /local/bin/X11 /local/packages/bin /usr/ucb /bin /usr/bin /usr/hosts /usr/bin/X11 /usr/sbin /etc /usr/etc . )

# sets ARCH to 'sgi' on SGI systems, 'sun4' on SunOS, 'solaris' on Solaris
setenv ARCH `/local/bin/ecfarch`

switch($ARCH)
case "linux":
# set environment variables
	setenv EDITOR /bin/vi
	setenv VISUAL /bin/vi
	setenv HOST `/bin/hostname`
# Interactive shell variables.
# Code inside this "if" statement is executed only for interactive sessions.
#
	if ( $?prompt ) then
		set mail=(60 /var/spool/mail/$user)
		set filec history=1000 savehist=200 notify=
	endif
	breaksw
case "sgi":
	#set path=( ~/bin/sgi ~/bin /packages/bin $path /usr/demos/bin )
	set path=( $path .)
	#setenv MANPATH /share/man:/local/X/man:/local/man:/usr/share/catman:/usr/local/man
# set environment variables
	setenv EDITOR /usr/ucb/vi
	setenv VISUAL /usr/ucb/vi
	setenv HOST `/usr/ucb/hostname`
# Interactive shell variables.
# Code inside this "if" statement is executed only for interactive sessions.
#
	if ( $?prompt ) then
		set prompt="`/usr/ucb/hostname`% "
		set mail=(60 /var/spool/mail/$user)
		set filec history=1000 savehist=200 notify=
	endif
	breaksw
default:
	echo Don\'t know what machine you are on.
	echo run /share/bin/dotfiles to get new .cshrc and .login
	if ( -f /share/skel/new.arch ) then
		source /usr/skel/new.arch
	endif
# set environment variables
	setenv EDITOR /bin/vi
	setenv VISUAL /bin/vi
	setenv HOST `/bin/hostname`
# Interactive shell variables.
# Code inside this "if" statement is executed only for interactive sessions.
#
	if ( $?prompt ) then
		set mail=(60 /var/spool/mail/$user)
		set filec history=1000 savehist=200 notify=
	endif

	breaksw
endsw

# set file creation mask, make all files and directories private
umask 077


# set up some aliases
alias h history -r
alias ls ls -C
alias ll ls -l
alias lt ls -ltr
alias j jobs -l
alias f finduser
alias d dirs
alias pd pushd
alias po popd

# set core limit, for people coming in through rshd
limit core 0

# DO NOT REMOVE the next few lines, it will be used to give you new features
if ( -f /share/skel/csh.updates ) then
	source /share/skel/csh.updates
endif


# read in user's .mycshrc
if ( -f ~/.mycshrc ) then
        source ~/.mycshrc
endif

#if (`whoami` == root) then
#	echo "$user becomes root"
#	source /.cshrc
#endif
