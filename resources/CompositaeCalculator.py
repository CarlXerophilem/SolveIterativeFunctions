import numpy as np
import matplotlib.pyplot as plt
from scipy.special import comb

import sys ; sys.set_int_max_str_digits(0)

# Define the composita of F(x)
def F_composita(n, k, a, b):
    if k > n:
        return 0
    return comb(n, k) * (a**(2*k - n)) * (b**(n - k))

# Recursive solver for A^\Delta(n, k)
def compute_A_composita(n, k, f1, a, b, memo):
    if (n, k) in memo:
        return memo[(n, k)]

    if n == k:
        result = f1**(n / 2)
    elif n > k:
        sum_term = sum(
            compute_A_composita(n, m, f1, a, b, memo) * compute_A_composita(m, k, f1, a, b, memo)
            for m in range(k + 1, n)
        )
        result = (F_composita(n, k, a, b) - sum_term) / (f1**(n / 2) + f1**(k / 2))
    else:
        result = 0

    memo[(n, k)] = result
    return result

# Compute coefficients of A(x) using composita
def compute_A_coefficients(max_degree, f1, a, b):
    A_coefficients = []
    memo = {}
    for n in range(1, max_degree + 1):
        A_coefficients.append(compute_A_composita(n, 1, f1, a, b, memo))
    return np.array(A_coefficients)

# Generate and plot the functions A(x) and F(x)
def plot_functions(a, b, f1, max_degree):
    # Compute coefficients for A(x)
    A_coefficients = compute_A_coefficients(max_degree, f1, a, b)

    # Define x values for plotting
    interval = 1000
    x = np.linspace(-1, 1, interval)

    # Compute A(x) and F(x)
    A_x = np.polyval(A_coefficients[::-1], x)
    F_x = a * x + b * x**2

    # Plot the functions
    plt.figure(figsize=(10, 6))
    plt.plot(x, F_x, label=f"F(x) = {a}*x + {b}*x^2", color="blue")
    plt.plot(x, A_x, label=f"A(x) = {np.log(A_x)}", color="orange")
    plt.title(f"plot of F(x) and A(x), with n ={max_degree} degrees of A(x) recurred. partition ={interval}")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.legend()
    plt.grid()
    #plt.close()
    #plt.savefig(f'F,{max_degree},{interval},2le1.png', bbox_inches='tight')
    plt.show()
# Parameters
a = 1
b = 1
f1 = 1  # f(1)
max_degree = 100  # Limit polynomial degree to avoid timeout

# Plot the functions
plot_functions(a, b, f1, max_degree)
