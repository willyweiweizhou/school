#pi lebniz notation
def pi(n):
    res=0.0
    for i in range(n+1):
        res=res+ ((-1)**i)/float(2*i+1)
    res=res*4
    return res
    
    #simplified fraction
    
def simplified_fraction(m,n):
    if n==0:
        return "not defined"
    elif m==0:
        return 0
    
    elif m==n:
        return 1
    elif m!=n:
        if m%n==0:
            return m/n
        else:
            for i in range((min(m,n)),1,-1):
                if m%((i)-1)==0 and n%((i)-1)==0:
                    a=m/(i-1)
                    b=n/(i-1)
                    return str(a)+'/'+str(b)
                    
                    
                    
    #sig fig of pi                
def find_terms(n):
    import math
    res=int(math.pi*(10**(n-1)))
    sum=0
    for i in range(10000000):
        sum=sum+((-1)**i)/float(2*i+1)
        if int(4*sum*(10**(n-1)))==res:
            return i

    #calender        
def next_day(y,m,d):
    if y%400==0:
        if m==2:
            if d<=28:
                d=d+1
                return y,m,d
            elif d==29:
                return y,m+1,1
        elif m==12:
            if d<31:
                d=d+1
                return y,m,d
            elif d==31:
                return y+1,1,1
        elif m==1 or 3 or 5 or 7 or 8 or 10:
            if d<=30:
                d=d+1
                return y,m,d
            if d==31:
                return y,m+1,1
        elif m==4 or 6 or 9 or 11:
            if d<=29:
                return y,m,d+1
            elif d==30:
                return y,m+1,1
    elif y%100==0:
        if m==2:
            if d<=27:
                d=d+1
                return y,m,d
            elif d==28:
                return y,m+1,1
        elif m==12:
            if d<31:
                d=d+1
                return y,m,d
            elif d==31:
                return y+1,1,1
        elif m==1 or 3 or 5 or 7 or 8 or 10:
            if d<=30:
                d=d+1
                return y,m,d
            if d==31:
                return y,m+1,1
        elif m==4 or 6 or 9 or 11:
            if d<=29:
                return y,m,d+1
            elif d==30:
                return y,m+1,1
    elif y%4==0:
        if m==2:
            if d<=28:
                d=d+1
                return y,m,d
            elif d==29:
                return y,m+1,1
        elif m==12:
            if d<31:
                d=d+1
                return y,m,d
            elif d==31:
                return y+1,1,1
        elif m==1 or 3 or 5 or 7 or 8 or 10:
            if d<=30:
                d=d+1
                return y,m,d
            if d==31:
                return y,m+1,1
        elif m==4 or 6 or 9 or 11:
            if d<=29:
                return y,m,d+1
            elif d==30:
                return y,m+1,1
    elif y%4!=0:
        if m==2:
            if d<=27:
                d=d+1
                return y,m,d
            elif d==28:
                return y,m+1,1
        elif m==12:
            if d<31:
                d=d+1
                return y,m,d
            elif d==31:
                return y+1,1,1
        elif m==1 or 3 or 5 or 7 or 8 or 10:
            if d<=30:
                d=d+1
                return y,m,d
            if d==31:
                return y,m+1,1
        elif m==4 or 6 or 9 or 11:
            if d<=29:
                return y,m,d+1
            elif d==30:
                return y,m+1,1
                
                
def count_days(y1,m1,d1,y2,m2,d2):
    y=y2-y1
    
    

    
if __name__=='__main__':
    print pi(1000)
    print simplified_fraction(8,6)
    print find_terms(3)
    print next_day(2000,4,15)

    
    
    
    
    
    



