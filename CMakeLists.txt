cmake_minimum_required(VERSION 3.15 FATAL_ERROR)

add_subdirectory(backend)
add_subdirectory(lib)

enable_testing()
add_subdirectory(test)