#!/usr/bin/env python3
"""
Romantic Birthday Terminal Surprise for Your Love (Besdong) ❤️
Run with: python3 birthday.py
"""

import sys
import time
import os
import random

# ANSI Color Codes
PINK = "\033[38;5;205m"
ROSE = "\033[38;5;211m"
RED = "\033[38;5;196m"
GOLD = "\033[38;5;220m"
CYAN = "\033[38;5;51m"
WHITE = "\033[38;5;231m"
PURPLE = "\033[38;5;141m"
RESET = "\033[0m"
BOLD = "\033[1m"

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")

def typewriter(text, delay=0.035, color=WHITE, bold=False):
    style = BOLD if bold else ""
    sys.stdout.write(style + color)
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    sys.stdout.write(RESET + "\n")

def draw_heart():
    heart = [
        "       ******       ******       ",
        "     **********   **********     ",
        "   ************* *************   ",
        "  *****************************  ",
        "  *****************************  ",
        "   ***************************   ",
        "     ***********************     ",
        "       *******************       ",
        "         ***************         ",
        "           ***********           ",
        "             *******             ",
        "               ***               ",
        "                *                "
    ]
    colors = [RED, PINK, ROSE]
    for line in heart:
        color = random.choice(colors)
        print(f"{color}{BOLD}{line}{RESET}")
        time.sleep(0.04)

def animate_heart_pulse(cycles=3):
    clear_screen()
    print("\n" * 2)
    small_heart = [
        "      ***   ***      ",
        "     ***** *****     ",
        "     ***********     ",
        "      *********      ",
        "        *****        ",
        "          *          "
    ]
    big_heart = [
        "    *****   *****    ",
        "   ******* *******   ",
        "  *****************  ",
        "   ***************   ",
        "     ***********     ",
        "       *******       ",
        "          *          "
    ]
    
    for _ in range(cycles):
        clear_screen()
        print(f"\n{PURPLE}   ✨ Preparing your surprise... ✨{RESET}\n")
        for line in small_heart:
            print(f"      {ROSE}{line}{RESET}")
        time.sleep(0.25)
        
        clear_screen()
        print(f"\n{PURPLE}   ✨ Preparing your surprise... ✨{RESET}\n")
        for line in big_heart:
            print(f"    {PINK}{BOLD}{line}{RESET}")
        time.sleep(0.35)

def draw_cake(with_flame=True):
    flame = f"{GOLD}{BOLD} ( )   ( )   ( ) {RESET}" if with_flame else f"{WHITE}  ~     ~     ~  {RESET}"
    wick  = f"{WHITE}  |     |     |  {RESET}"
    candle= f"{PINK} [|]   [|]   [|] {RESET}"
    
    cake_layers = [
        f"        {flame}",
        f"        {wick}",
        f"        {candle}",
        f"{ROSE}   .-------------------.{RESET}",
        f"{PINK}  (  HAPPY BIRTHDAY!    ){RESET}",
        f"{ROSE}   )                   ({RESET}",
        f"{RED}  '====================='{RESET}",
        f"{WHITE} (  🍓  ❤️  🍓  ❤️  🍓  ){RESET}",
        f"{RED}  '====================='{RESET}",
        f"{GOLD} /                       \\{RESET}",
        f"{GOLD}|       TO MY LOVE        |{RESET}",
        f"{GOLD} \\_______________________/{RESET}",
        f"{WHITE}~~~~~~~~~~~~~~~~~~~~~~~~~~~{RESET}"
    ]
    for layer in cake_layers:
        print(f"    {layer}")

def main():
    animate_heart_pulse(2)
    clear_screen()
    print("\n")
    
    typewriter("✨ កាដូខួបកំណើតពិសេសសម្រាប់បង ✨", 0.04, GOLD, True)
    print("\n")
    
    draw_heart()
    print("\n")
    
    typewriter("ផ្ញើជូនបងសម្លាញ់ ជាមនុស្សជាទីស្រឡាញ់ និងជាបេះដូងរបស់អូន (❤️):", 0.04, PINK, True)
    print("")
    typewriter("រីករាយថ្ងៃខួបកំណើតណា បុរសដ៏ល្អបំផុតក្នុងជីវិតរបស់អូន!", 0.035, WHITE)
    typewriter("រាល់ថ្ងៃដែលបាននៅក្បែរបង គឺជាកាដូដ៏មានតម្លៃបំផុតដែលអូនមាន។", 0.035, WHITE)
    typewriter("ស្នាមញញឹមរបស់បង គឺជាពន្លឺថ្ងៃ និងជាសេចក្ដីសុខរបស់អូនរាល់ថ្ងៃ។", 0.035, ROSE)
    typewriter("សង្ឃឹមថាបងនឹងសប្បាយចិត្តកាន់តែច្រើន មានសុខភាពល្អ រកលុយបានច្រើនៗណាបងសម្លាញ់!", 0.035, WHITE)
    print("\n")
    
    typewriter("នំខួបកំណើតមួយនេះ ធ្វើឡើងចេញពីបេះដូង និងក្ដីស្រឡាញ់សម្រាប់បង:", 0.035, CYAN)
    print("")
    draw_cake(with_flame=True)
    print("\n")
    
    input(f"{GOLD}{BOLD}👉 បិទភ្នែក បួងសួងសុំពរ រួចចុច [ENTER] ដើម្បីផ្លុំទៀនណា...{RESET} ")
    
    # Blowing out sequence
    clear_screen()
    print("\n\n")
    typewriter("💨 *ព្រូស* ផ្លុំទៀនខួបកំណើត... 💨\n", 0.04, CYAN)
    time.sleep(0.5)
    
    clear_screen()
    print("\n\n")
    draw_cake(with_flame=False)
    print("\n")
    
    # Celebration burst
    typewriter("🎉✨ ពរជ័យត្រូវបានសម្រេចហើយ! ✨🎉", 0.05, GOLD, True)
    typewriter("សូមឱ្យឆ្នាំថ្មីនេះ បងជួបតែរឿងល្អៗ សំណាងល្អ និងមានក្ដីសុខជានិច្ច!", 0.035, PINK)
    print("")
    typewriter("រីករាយថ្ងៃខួបកំណើត បេះដូងរបស់អូន ❤️", 0.04, ROSE, True)
    typewriter("ស្រឡាញ់បងជារៀងរហូត មិនប្រែប្រួលឡើយ។", 0.045, WHITE)
    print("\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{PINK}Happy Birthday My Love! ❤️{RESET}\n")
