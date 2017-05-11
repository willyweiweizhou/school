def initialize():
    global cur_health
    global cur_hedons
    global cur_time
    
    global last_activity
    global last_activity_duration
    
    global las_finished
    
    global bored_with_stars
    
    cur_health = 0
    cur_hedons = 0
    cur_star = None
    curent_start_activity = None
    bored_with_stars = False
    last_activity = None
    last_activity_duration = 0
    current_time = 0
    last_finished = -1000
    
    

def perform_activity(activity,time):
    global last_activity
    global time
    global activity
    running = 'running'
    resting = 'resting'
    textbook = 'textbook'
    
    if offer_star()==False:     #no star
        if activity == 'resting':
            cur_health= cur_health
            cur_hedons = cur_hedons
    
    
        if activity == 'running':
        
            if last_activity == 'resting' and last_activity_duration >= 120 :        #not tired
                if  time <=10:
                    cur_hedons += 2*time
                    cur_health += 10*3
                    
                if time > 10 and time <= 180:
                    cur_hedons += 20-(time - 10)*2
                    cur_health += 3*time
                if time > 180:
                    cur_hedons += 10*2 - (time - 10)*2
                    cur_health += 180*3 + (time - 180)*1
                
            elif last_activity == 'running':  #tired
                time = time + last_activity_duration
                if time <= 180:
                    cur_hedons += time*(-2)
                    cur_health += 3*time
                else:
                    cur_hedons += time*(-2)
                    cur_health += 180*3 + (time - 180)*1
            else:  #tired
                if time <= 180:
                    cur_hedons += time*(-2)
                    cur_health += 3*time
                else:
                    cur_hedons += time*(-2)
                    cur_health += 180*3 + (time - 180)*1
    
        if activity == 'textbook':
            if last_activity == 'resting' and last_activity_duration <= 120:        #not tired
                if  time <= 20:
                    cur_hedons += time * 1
                    cur_health += 2 * time
                if time > 20:
                    cur_hedons += 1 * (20) + (time - 20)*(-1)
                    cur_health += 2 * time
            
                
            elif last_activity == 'textbook':  #tired
                time = time + last_activity_duration
                cur_hedons += time*(-2)
                cur_health += 2*time
            
            else:  #tired
                cur_hedons += time*(-2)
                cur_health += 2*time
                
    
    cur_time += time       
    last_activity = activity
    last_activity_duration = time
       
       
       
       
       
       
def offer_star():
    
    
    return False
    


def get_cur_hedons():
    return cur_hedons

def get_cur_health():
    return cur_health

def fun_activity_minute():
    pass
def star_can_be_taken(activity):
    pass

def get_effective_minutes_left_hedons(activity):
    '''Return the number of minutes during which the user will get the full
    amount of hedons for activity activity'''
    
    
def get_effective_minutes_left_health(activity):
    pass    

def estimate_hedons_delta(activity, duration):
    '''Return the amount of hedons the user would get for performing activity
    activity for duration minutes'''
    pass
            

def estimate_health_delta(activity, duration):
    pass
        
       
       
       
    if __name__=='__main__':
        initialize()
        perform_activity('running',30)
        perform_acticity('running',50)
        print(get_cur_hedons())
    