# Reused functions and macros from https://github.com/sun1211/cmake_with_add_subdirectory
cmake_minimum_required(VERSION 3.15 FATAL_ERROR)

add_subdirectory(backend)
add_subdirectory(lib)

enable_testing()
add_subdirectory(test)