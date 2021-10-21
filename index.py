import psutil
from win32gui import GetWindowText, GetForegroundWindow
import time
import eel
from plyer import notification

def show_notification(title, message):
    notification.notify(title = title, message = message, app_icon = '../timer.ico', timeout = 5)

eel.init('front')

@eel.expose()
def timer():
    full_time = working_time = 0
    lost_seconds = False
    stop_or_not = True

    while True:
        full_time += 1
        active_window = GetWindowText(GetForegroundWindow())[-18:]
        
        if working_time > 0:
            if working_time % 21600 == 0:
                show_notification('Timer', "You're programming for 6 hours! Well work!")
            elif working_time % 18000 == 0:
                show_notification('Timer', "You're programming for 5 hours! So nice!")
            elif working_time % 14400 == 0:
                show_notification('Timer', "You're programming for 4 hours! Wondeful day for programming!")
            elif working_time % 10800 == 0:
                show_notification('Timer', "You're programming for 3 hours! Good result!")
            elif working_time % 7200 == 0:
                show_notification('Timer', "You're programming for 2 hours! Not bad!")
            elif working_time % 3600 == 0:
                show_notification('Timer', "You're programming for 1 hour! This is only the beginning! Try harder =)")

        if eel.check_start()() == True:
            active_window = 'Visual Studio Code'

            full_time = 0
            stop_or_not = True
        
        if eel.check_stop()() == True:
            lost_seconds = True

        stop_or_not = eel.stop_or_not()()
        print(stop_or_not)

        try:
            working_time += int(eel.add_time()())
        except:
            continue
        
        if active_window == 'Visual Studio Code':
            working_time += 1
            lost_seconds = False

        else:
            if lost_seconds == False:
                flag = False
                working_time += 1
                print(full_time)
                if stop_or_not == True:
                    if full_time % 180 == 0:

                        for proc in psutil.process_iter():
                            try:
                                processName = proc.name()

                                if flag == False:
                                    if processName == 'Code.exe':
                                        flag = True
                                        lost_seconds = True
                            
                            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                                pass
        
        eel.show_time(working_time)

        time.sleep(1)

eel.start('index.html', size = (800, 1000))