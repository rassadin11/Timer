import psutil
from win32gui import GetWindowText, GetForegroundWindow
import time
import eel
from plyer import notification
from openpyxl import load_workbook
from openpyxl.utils import get_column_letter
from openpyxl.styles.fills import PatternFill

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
                show_notification('Timer', "You're programming for 6 hours! Great work!")
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

        obj = eel.addExcelPosts()()

        def addPost(obj):
            flag = True

            if obj['local_variable'] == False:
                return

            if flag == True:
                try:
                    path = 'list.xlsx'

                    wb = load_workbook(filename=path)

                    for cells in wb[wb.sheetnames[0]]['A:K']:
                        for rows in cells:
                            if rows.value != None:
                                if obj['date'] == str(rows.value):
                                    rows.fill = PatternFill("solid", start_color="ff0ff0", end_color="ff0ff0") # work =)

                                    new_coords = f'{get_column_letter(rows.column + 1)}{rows.row}'
                                    wb[wb.sheetnames[0]][new_coords] = obj['text']

                                    wb.save(path)

                                    wb[wb.sheetnames[0]][new_coords].fill = PatternFill("solid", start_color="ff0ff0", end_color="ff0ff0") # work =)

                                    wb.save(path)

                                    new_coords = f'{get_column_letter(rows.column)}{rows.row + 2}'
                                    wb[wb.sheetnames[0]][new_coords] = obj['tm']

                                    wb.save(path)

                                    wb[wb.sheetnames[0]][new_coords].fill = PatternFill("solid", start_color="ff0ff0", end_color="ff0ff0") # work =)

                                    wb.save(path)
                    wb.save(path)
                except:
                    pass

        addPost(obj)
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