# Reused functions and macros from https://github.com/sun1211/cmake_with_add_subdirectory
cmake_minimum_required(VERSION 3.10 FATAL_ERROR)

project(password-manager)

add_subdirectory(src)
add_subdirectory(lib)

enable_testing()
add_subdirectory(test)