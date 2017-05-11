# The original copy of this file is in "/usr/share/login".
# It should be copied into your home directory using the file name ".login".
# The ".login" file is executed AFTER executing your ".cshrc" file
# when you log in.  It is executed only once at the beginning of a session.
# In contrast, your ".cshrc" file is executed every time you start a C-shell.
#
# ECF recommends that you do not make any changes to this file.
# Instead, you may add custom features (if you wish) in a file
# in your home directory with the file name ".mylogin".
# This file (your ".login") will execute any ".mylogin" file automatically.
# If ECF makes major changes (new hardware, etc), you may be asked to
# update your ".login" file from the updated version of "/usr/share/login".
#

# sets ARCH to 'sgi' on SGI systems, 'sun4' on SunOS, 'solaris' on Solaris

# read in user's .mylogin
if ( -f ~/.mylogin ) then
	source ~/.mylogin
endif

git pull -q
