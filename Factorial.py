# -*- coding: utf-8 -*-
"""
Created on Sat Dec  2 20:54:41 2023(ChatGPT)
Last edited: 11/12/2024

@author: username
"""
import sys
sys.set_int_max_str_digits(0)
 
import csv
from sympy import factorial

def factorial_binary_splitting(x):
    if x < 0:
        raise ValueError("Factorial is not defined for negative integers.")
    return factorial(x)

def output_to_csv(x, filename="xvalue.csv"):
    result = factorial_binary_splitting(x)
    
    # Write the result to the CSV file
    with open(filename, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([x, str(result)])
    
    print(f"Saved {x}! to {filename}")

# Example usage
while True:
    try:
        x = int(input("Enter the value of x (or type 'exit' to quit): "))
        output_to_csv(x)
    except ValueError:
        print("Exiting...")
        break
